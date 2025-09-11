import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface APISingleResponse<D extends unknown> {
  data: D;
  meta?: Record<string, unknown>;
}

interface APIErrorResponse {
  message: string;
  meta?: Record<string, unknown>;
}

interface ContributionCalendar {
  colors: string[];
  totalContributions: number;
  months: {
    firstDay: string;
    name: string;
    totalWeeks: number;
  }[];
  weeks: {
    contributionDays: {
      color: string;
      contributionCount: number;
      date: string;
    }[];
    firstDay: string;
  }[];
}

interface GitHubStats {
  followers: number;
  stars: number;
  contributions: ContributionCalendar;
  contributionYears: number[];
}

const getEnv = (key: string): string | undefined => {
  if (typeof process === "undefined" || !process.env) {
    console.warn(`Cannot access process.env in this environment.`);
    return undefined;
  }
  return process.env[key];
};

const response = <T>(
  data: T,
  status: number = 200,
  options?: ResponseInit
): NextResponse => {
  return new NextResponse(JSON.stringify(data), {
    headers: {
      ...(options?.headers || {}),
      "Content-Type": "application/json",
    },
    status,
    ...(options || {}),
  });
};

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const GITHUB_API_URL = "https://api.github.com";
    const GITHUB_USERNAME = "Manish-Tamang";
    // Optional year filter for contributions
    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get("year");
    const year = yearParam ? Number(yearParam) : undefined;
    const isValidYear = year && Number.isInteger(year) && year > 2007 && year < 3000;
    const from = isValidYear ? `${year}-01-01T00:00:00Z` : undefined;
    const to = isValidYear ? `${year}-12-31T23:59:59Z` : undefined;

    const githubUserResponse = await fetch(
      `${GITHUB_API_URL}/users/${GITHUB_USERNAME}`,
      {
        headers: {
          Authorization: `Bearer ${getEnv("GITHUB_READ_USER_TOKEN_PERSONAL")}`,
          "Content-Type": "application/json",
          "User-Agent": "manishtamang.com",
        },
      }
    );

    if (!githubUserResponse.ok) {
      throw new Error(
        `GitHub User API Error: ${githubUserResponse.status} - ${await githubUserResponse.text()}`
      );
    }
    const user: { followers: number } = await githubUserResponse.json();

    const githubReposResponse = await fetch(
      `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?per_page=1000`,
      {
        headers: {
          Authorization: `Bearer ${getEnv("GITHUB_READ_USER_TOKEN_PERSONAL")}`,
          "Content-Type": "application/json",
          "User-Agent": "manishtamang.com",
        },
      }
    );

    if (!githubReposResponse.ok) {
      throw new Error(
        `GitHub Repos API Error: ${githubReposResponse.status} - ${await githubReposResponse.text()}`
      );
    }
    const repositories: { fork: boolean; stargazers_count: number }[] =
      await githubReposResponse.json();

    const mine = repositories.filter((repo) => !repo.fork);
    const stars: number = mine.reduce((acc: number, repo) => {
      const { stargazers_count: stargazers = 0 } = repo;
      return acc + stargazers;
    }, 0);

    const contributionQuery = `
    {
      viewer {
        contributionYears: contributionsCollection { contributionYears }
        contributionsCollection${from && to ? `(from: "${from}", to: "${to}")` : ""} {
          contributionCalendar {
            colors
            totalContributions
            months {
              firstDay
              name
              totalWeeks
            }
            weeks {
              contributionDays {
                color
                contributionCount
                date
              }
              firstDay
            }
          }
        }
      }
    }
    `;

    const githubContributionsResponse = await fetch(
      `${GITHUB_API_URL}/graphql`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getEnv("GITHUB_READ_USER_TOKEN_PERSONAL")}`,
          "Content-Type": "application/json",
          "User-Agent": "manishtamang.com",
        },
        body: JSON.stringify({ query: contributionQuery }),
      }
    );

    if (!githubContributionsResponse.ok) {
      throw new Error(
        `GitHub Contributions GraphQL API Error: ${githubContributionsResponse.status} - ${await githubContributionsResponse.text()}`
      );
    }
    const contributionsData: {
      data: {
        viewer: {
          contributionsCollection: {
            contributionCalendar: ContributionCalendar;
          };
          contributionYears: { contributionYears: number[] };
        };
      };
    } = await githubContributionsResponse.json();

    const contributions =
      contributionsData?.data?.viewer?.contributionsCollection
        .contributionCalendar;
    const contributionYears =
      contributionsData?.data?.viewer?.contributionYears?.contributionYears || [];

    if (!contributions) {
      throw new Error("Failed to fetch GitHub contributions.");
    }

    const githubStats: GitHubStats = {
      followers: user.followers,
      stars,
      contributions,
      contributionYears,
    };

    return response<APISingleResponse<GitHubStats>>({ data: githubStats });
  } catch (error: any) {
    console.error("Error fetching GitHub data:", error);
    return response<APIErrorResponse>({
      message: error.message || "Failed to fetch GitHub data",
    });
  }
}
