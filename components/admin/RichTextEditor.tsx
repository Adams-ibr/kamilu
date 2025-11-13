
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

declare global {
    interface Window {
        tinymce: any;
    }
}

interface RichTextEditorProps {
    value: string;
    onEditorChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onEditorChange }) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const { theme } = useTheme();
    const id = React.useMemo(() => `tinymce-editor-${Math.random().toString(36).substring(2, 9)}`, []);

    React.useEffect(() => {
        if (!textareaRef.current || typeof window.tinymce === 'undefined') {
            return;
        }

        window.tinymce.init({
            target: textareaRef.current,
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
            content_css: theme === 'dark' ? 'dark' : 'default',
            height: 400,
            menubar: false,
            setup: (editor: any) => {
                editor.on('init', () => {
                    editor.setContent(value);
                });
                
                // Use a simple timeout to debounce changes to avoid excessive re-renders
                let timeout: number;
                editor.on('change keyup', () => {
                    window.clearTimeout(timeout);
                    timeout = window.setTimeout(() => {
                        onEditorChange(editor.getContent());
                    }, 250);
                });
            },
        });

        return () => {
            const editor = window.tinymce.get(textareaRef.current?.id);
            if (editor) {
                editor.remove();
            }
        };
    // The key prop on this component in its parent handles re-initialization.
    // We only need `theme` here to ensure the editor re-renders if the theme is toggled.
    }, [theme]);

    return (
        <textarea
            ref={textareaRef}
            id={id}
            style={{ height: '400px', visibility: 'hidden' }} // Keep the textarea for TinyMCE to target
            defaultValue={value}
        />
    );
};

export default RichTextEditor;
