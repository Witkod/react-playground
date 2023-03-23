import { useCallback, useEffect, useState } from "react";

export const useKeyboardShortcut = (
  shortcutDescription: string,
  callback: () => void
) => {
  const [shortcutKeys, setShortcutKeys] = useState<string[]>([]);
  const [pressedShortcutKeysNumber, setPressedShortcutKeysNumber] = useState(0);

  const parseShortcutDescription = useCallback(() => {
    try {
      const descriptionWithoutWhitespaces = shortcutDescription.replaceAll(
        " ",
        ""
      );
      const parsedKeys = descriptionWithoutWhitespaces.split("+");
      setShortcutKeys(parsedKeys);
    } catch (e) {
      console.log(e);
    }
  }, [shortcutDescription]);

  useEffect(parseShortcutDescription, [parseShortcutDescription]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (pressedShortcutKeysNumber >= shortcutKeys.length) {
        return;
      }
      if (event.key !== shortcutKeys[pressedShortcutKeysNumber]) {
        setPressedShortcutKeysNumber(0);
        return;
      }
      setPressedShortcutKeysNumber((prev) => prev + 1);
    },
    [shortcutKeys, pressedShortcutKeysNumber]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    setPressedShortcutKeysNumber(0);
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  useEffect(() => {
    if (
      shortcutKeys.length > 0 &&
      pressedShortcutKeysNumber === shortcutKeys.length
    ) {
      callback();
    }
  }, [callback, pressedShortcutKeysNumber, shortcutKeys]);
};
