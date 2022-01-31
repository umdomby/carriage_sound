import React, {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../index";

export const useSpeechSynthesis = (props = {}) => {
    const { onEnd = () => {} } = props;
    const {device} = useContext(Context)
    const [voices, setVoices] = useState([]);
    const synth = useRef();
    const [speaking, setSpeaking] = useState(false);

    const updateVoices = () => {
        setVoices(synth.current.getVoices());
    };

    const handleEnd = () => {
        setSpeaking(false);
        onEnd();
    };

    const speak = (text, voice, pitch = 1, rate = 1) => {
        setSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.lang = device.lang;
        utterance.onend = handleEnd;
        synth.current.speak(utterance);
    }

    useEffect(() => {
        if (typeof window !== 'object' || !window.speechSynthesis) return;
        synth.current = window.speechSynthesis;
        synth.current.onvoiceschanged = updateVoices;
        updateVoices();
        return () => {
            synth.current.onvoiceschanged = null
        }
    }, []);

    return ([
        voices,
        speak,
        speaking,
    ]);
}

