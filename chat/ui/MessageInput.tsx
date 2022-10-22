import {
    FormElement,
    Input,
    Text,
} from "@nextui-org/react";
import {ChangeEvent, SyntheticEvent, MouseEvent, useState} from "react";

export default function MessageInput({sendMessage}: {sendMessage: (message: string) => void}) {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e: ChangeEvent<FormElement>) => {
        const {value} = e.target;
        if (value.length <= 512) {
            setContent(e.target.value);
        } else {
            setError("Wiadomość nie może być dłuższa niż 512 znaków");
        }
    }

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement> | MouseEvent) => {
        e.preventDefault();
        if (content) {
            sendMessage(content);
            setContent("");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input value={content} onChange={handleChange}/>
            <img src="/send_icon.svg" alt="send" onClick={handleSubmit}/>
            <Text color="error">{error}</Text>
        </form>
    );
}
