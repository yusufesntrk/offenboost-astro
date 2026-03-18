import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface TypingEffectProps {
  /** Text(e) die getippt werden sollen */
  texts: string[];
  /** Geschwindigkeit des Tippens in ms (default: 100) */
  typingSpeed?: number;
  /** Geschwindigkeit des Löschens in ms (default: 50) */
  deletingSpeed?: number;
  /** Pause nach vollständigem Text in ms (default: 2000) */
  pauseDuration?: number;
  /** Pause vor dem Löschen in ms (default: 1000) */
  pauseBeforeDelete?: number;
  /** Nur einmal tippen, nicht loopen (default: false) */
  once?: boolean;
  /** Cursor anzeigen (default: true) */
  showCursor?: boolean;
  /** Cursor-Zeichen (default: |) */
  cursor?: string;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** CSS-Klassen für den Cursor */
  cursorClassName?: string;
}

export function TypingEffect({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  pauseBeforeDelete = 1000,
  once = false,
  showCursor = true,
  cursor = '|',
  className,
  cursorClassName,
}: TypingEffectProps) {
  // SEO: Start mit erstem Wort vollständig (für Crawler)
  const [displayText, setDisplayText] = useState(texts[0] || '');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Nach erstem Render: Pause, dann normal weiter
  useEffect(() => {
    if (isFirstRender) {
      const timer = setTimeout(() => {
        setIsFirstRender(false);
        setIsDeleting(true); // Starte mit Löschen des ersten Wortes
      }, pauseBeforeDelete);
      return () => clearTimeout(timer);
    }
  }, [isFirstRender, pauseBeforeDelete]);

  const currentText = texts[textIndex];

  const handleTyping = useCallback(() => {
    if (isComplete || isFirstRender) return;

    if (!isDeleting) {
      // Tippen
      if (displayText.length < currentText.length) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else {
        // Text vollständig getippt
        if (once && textIndex === texts.length - 1) {
          setIsComplete(true);
          return;
        }
        // Pause, dann löschen
        setTimeout(() => {
          setIsDeleting(true);
        }, pauseBeforeDelete);
      }
    } else {
      // Löschen
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        // Zum nächsten Text
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayText, isDeleting, currentText, textIndex, texts.length, once, pauseBeforeDelete, isComplete, isFirstRender]);

  useEffect(() => {
    // Warte auf Ende des ersten Renders
    if (isFirstRender) return;

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const delay = displayText.length === currentText.length && !isDeleting ? pauseDuration : speed;

    const timer = setTimeout(handleTyping, delay);
    return () => clearTimeout(timer);
  }, [handleTyping, isDeleting, typingSpeed, deletingSpeed, pauseDuration, displayText.length, currentText.length, isFirstRender]);

  return (
    <span className={cn('inline', className)}>
      {displayText || '\u00A0'}
      {showCursor && (
        <span
          className={cn(
            'inline-block ml-0.5 animate-blink',
            cursorClassName
          )}
        >
          {cursor}
        </span>
      )}
    </span>
  );
}

// Einfache Variante: Nur einmal tippen
interface SimpleTypingProps {
  text: string;
  speed?: number;
  showCursor?: boolean;
  cursor?: string;
  className?: string;
  cursorClassName?: string;
  onComplete?: () => void;
}

export function SimpleTyping({
  text,
  speed = 100,
  showCursor = true,
  cursor = '|',
  className,
  cursorClassName,
  onComplete,
}: SimpleTypingProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayText, text, speed, isComplete, onComplete]);

  return (
    <span className={cn('inline', className)}>
      {displayText}
      {showCursor && !isComplete && (
        <span
          className={cn(
            'inline-block ml-0.5 animate-blink',
            cursorClassName
          )}
        >
          {cursor}
        </span>
      )}
    </span>
  );
}
