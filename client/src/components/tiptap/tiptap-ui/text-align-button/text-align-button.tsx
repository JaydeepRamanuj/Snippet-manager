import * as React from "react";
import { type Editor, type ChainedCommands } from "@tiptap/react";

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// --- Icons ---
import { AlignCenterIcon } from "@/components/tiptap/tiptap-icons/align-center-icon";
import { AlignJustifyIcon } from "@/components/tiptap/tiptap-icons/align-justify-icon";
import { AlignLeftIcon } from "@/components/tiptap/tiptap-icons/align-left-icon";
import { AlignRightIcon } from "@/components/tiptap/tiptap-icons/align-right-icon";

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap/tiptap-ui-primitive/button";
import { Button } from "@/components/tiptap/tiptap-ui-primitive/button";

export type TextAlign = "left" | "center" | "right" | "justify";

export interface TextAlignButtonProps extends ButtonProps {
  /**
   * The TipTap editor instance.
   */
  editor?: Editor | null;
  /**
   * The text alignment to apply.
   */
  align: TextAlign;
  /**
   * Optional text to display alongside the icon.
   */
  text?: string;
  /**
   * Whether the button should hide when the alignment is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean;
}

export const textAlignIcons = {
  left: AlignLeftIcon,
  center: AlignCenterIcon,
  right: AlignRightIcon,
  justify: AlignJustifyIcon,
};

export const textAlignShortcutKeys: Partial<Record<TextAlign, string>> = {
  left: "Ctrl-Shift-l",
  center: "Ctrl-Shift-e",
  right: "Ctrl-Shift-r",
  justify: "Ctrl-Shift-j",
};

export const textAlignLabels: Record<TextAlign, string> = {
  left: "Align left",
  center: "Align center",
  right: "Align right",
  justify: "Align justify",
};

export function hasSetTextAlign(
  commands: ChainedCommands,
): commands is ChainedCommands & {
  setTextAlign: (align: TextAlign) => ChainedCommands;
} {
  return "setTextAlign" in commands;
}

export function checkTextAlignExtension(editor: Editor | null): boolean {
  if (!editor) return false;

  const hasExtension = editor.extensionManager.extensions.some(
    (extension) => extension.name === "textAlign",
  );

  if (!hasExtension) {
    console.warn(
      "TextAlign extension is not available. " +
        "Make sure it is included in your editor configuration.",
    );
  }

  return hasExtension;
}

export function canSetTextAlign(
  editor: Editor | null,
  align: TextAlign,
  alignAvailable: boolean,
): boolean {
  if (!editor || !alignAvailable) return false;

  try {
    return editor.can().setTextAlign(align);
  } catch {
    return false;
  }
}

export function isTextAlignActive(
  editor: Editor | null,
  align: TextAlign,
): boolean {
  if (!editor) return false;
  return editor.isActive({ textAlign: align });
}

export function setTextAlign(editor: Editor | null, align: TextAlign): boolean {
  if (!editor) return false;

  const chain = editor.chain().focus();
  if (hasSetTextAlign(chain)) {
    return chain.setTextAlign(align).run();
  }
  return false;
}

export function isTextAlignButtonDisabled(
  editor: Editor | null,
  alignAvailable: boolean,
  canAlign: boolean,
  userDisabled: boolean = false,
): boolean {
  if (!editor || !alignAvailable) return true;
  if (userDisabled) return true;
  if (!canAlign) return true;
  return false;
}

export function shouldShowTextAlignButton(
  editor: Editor | null,
  canAlign: boolean,
  hideWhenUnavailable: boolean,
): boolean {
  if (!editor?.isEditable) return false;
  if (hideWhenUnavailable && !canAlign) return false;
  return true;
}

export function useTextAlign(
  editor: Editor | null,
  align: TextAlign,
  disabled: boolean = false,
  hideWhenUnavailable: boolean = false,
) {
  const alignAvailable = React.useMemo(
    () => checkTextAlignExtension(editor),
    [editor],
  );

  const canAlign = React.useMemo(
    () => canSetTextAlign(editor, align, alignAvailable),
    [editor, align, alignAvailable],
  );

  const isDisabled = isTextAlignButtonDisabled(
    editor,
    alignAvailable,
    canAlign,
    disabled,
  );
  const isActive = isTextAlignActive(editor, align);

  const handleAlignment = React.useCallback(() => {
    if (!alignAvailable || !editor || isDisabled) return false;
    return setTextAlign(editor, align);
  }, [alignAvailable, editor, isDisabled, align]);

  const shouldShow = React.useMemo(
    () => shouldShowTextAlignButton(editor, canAlign, hideWhenUnavailable),
    [editor, canAlign, hideWhenUnavailable],
  );

  const Icon = textAlignIcons[align];
  const shortcutKey = textAlignShortcutKeys[align];
  const label = textAlignLabels[align];

  return {
    alignAvailable,
    canAlign,
    isDisabled,
    isActive,
    handleAlignment,
    shouldShow,
    Icon,
    shortcutKey,
    label,
  };
}

export const TextAlignButton = React.forwardRef<
  HTMLButtonElement,
  TextAlignButtonProps
>(
  (
    {
      editor: providedEditor,
      align,
      text,
      hideWhenUnavailable = false,
      className = "",
      disabled,
      onClick,
      children,
      ...buttonProps
    },
    ref,
  ) => {
    const editor = useTiptapEditor(providedEditor);

    const {
      isDisabled,
      isActive,
      handleAlignment,
      shouldShow,
      Icon,
      shortcutKey,
      label,
    } = useTextAlign(editor, align, disabled, hideWhenUnavailable);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);

        if (!e.defaultPrevented && !disabled) {
          handleAlignment();
        }
      },
      [onClick, disabled, handleAlignment],
    );

    if (!shouldShow || !editor || !editor.isEditable) {
      return null;
    }

    return (
      <Button
        type="button"
        className={className.trim()}
        disabled={isDisabled}
        data-style="ghost"
        data-active-state={isActive ? "on" : "off"}
        data-disabled={isDisabled}
        role="button"
        tabIndex={-1}
        aria-label={label}
        aria-pressed={isActive}
        tooltip={label}
        shortcutKeys={shortcutKey}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children || (
          <>
            <Icon className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
          </>
        )}
      </Button>
    );
  },
);

TextAlignButton.displayName = "TextAlignButton";

export default TextAlignButton;
