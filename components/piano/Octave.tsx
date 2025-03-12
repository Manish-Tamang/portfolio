
import React from 'react';
import styles from './Octave.module.css';

interface OctaveProps {
    octave: string;
}

const Octave: React.FC<OctaveProps> = ({ octave }) => {
    const avoidRender = () => true;

    return (
        <div id="octave" octave={octave} className={styles.octave}>
            <div id="black-notes" className={styles.blackNotes}>
                {octave === "100" ? (
                    <>
                        <span note="c1"></span>
                        <span note="c1"></span>
                    </>
                ) : null}
                <span note="0"></span>
                <span id={'db' + octave} tracker={'FF5B1B'} note={'Db' + octave} label={'d'}></span>
                <span id={'eb' + octave} tracker={'0fddff'} note={'Eb' + octave} label={'e'}></span>
                <span note="0"></span>
                <span note="0"></span>
                <span id={'gb' + octave} tracker={'026400'} note={'Gb' + octave} label={'g'}></span>
                <span id={'ab' + octave} tracker={'7100A4'} note={'Ab' + octave} label={'a'}></span>
                <span id={'bb' + octave} tracker={'FF00A7'} note={'Bb' + octave} label={'b'}></span>
                <span note="0"></span>
            </div>
            <div id="white-notes" className={styles.whiteNotes}>
                {octave === "100" ? (
                    <>
                        <span tracker={'f00000'} note={'c' + octave} label={'c'}>
                        </span><span tracker={'f00sss'} note={'c' + octave} label={'c'}></span>
                    </>
                ) : null}
                <span id={'c' + octave} tracker={'f00'} note={'c' + octave} label={'c'}></span>
                <span id={'d' + octave} tracker={'FF5B1B'} note={'d' + octave} label={'d'}></span>
                <span id={'e' + octave} tracker={'0fddff'} note={'e' + octave} label={'e'}></span>
                <span id={'f' + octave} tracker={'FCFF21'} note={'f' + octave} label={'f'}></span>
                <span id={'g' + octave} tracker={'026400'} note={'g' + octave} label={'g'}></span>
                <span id={'a' + octave} tracker={'7100A4'} note={'a' + octave} label={'a'}></span>
                <span id={'b' + octave} tracker={'FF00A7'} note={'b' + octave} label={'b'}></span>
            </div>
        </div>
    );
};

export default React.memo(Octave, () => true);