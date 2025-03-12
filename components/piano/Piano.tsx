"use client";

import React, { useRef, useEffect } from 'react';
import Octave from './Octave';
import Sounds from './Sounds';

const Piano = () => {
    const soundsRef = useRef(Sounds);
    const activeNoteRef = useRef<HTMLSpanElement | null>(null);

    const playNote = (note: string) => {
        const sound = soundsRef.current[note as keyof typeof Sounds];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
            sound.play().catch(error => {
                console.error("Error playing sound:", error);
            });
        }
    };

    const handlePianoKeyPress = (e: MouseEvent) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLSpanElement;
        if (!target) return;
        if (activeNoteRef.current) {
            activeNoteRef.current.removeAttribute('active');
        }

        target.setAttribute('active', 'true');
        activeNoteRef.current = target;

        const note = target.getAttribute('note');
        if (!note) return;
        playNote(note.toUpperCase());
    };

    useEffect(() => {
        const pianoKeys = document.querySelectorAll<HTMLSpanElement>('#pianoContainer span');

        pianoKeys.forEach(obj => {
            obj.addEventListener('mousedown', handlePianoKeyPress);
        });

        return () => {
            pianoKeys.forEach(obj => {
                obj.removeEventListener('mousedown', handlePianoKeyPress);
            });
        };
    }, []);

    return (
        <div role="main" className="piano-main">
            <section className="piano-child1">
                <div id="pianoContainer" className="piano-container">
                    <Octave octave="1" />
                    <Octave octave="2" />
                    <Octave octave="3" />
                    <Octave octave="4" />
                    <Octave octave="5" />
                    <Octave octave="6" />
                    <Octave octave="7" />
                </div>
            </section>
        </div>
    );
};

export default Piano;