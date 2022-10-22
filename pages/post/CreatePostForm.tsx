import { Input, Textarea, Checkbox, Button, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
import { postApi } from "post/api";
import { useEffect, useState } from "react";

export default function CreatePostForm() {
    const router = useRouter();
    const [select, setSelectValue] = useState(false);
    const [title, setTitleValue] = useState("");
    const [description, setDescriptionValue] = useState("");

    useEffect(() => {
        handleBtn(select, title, description);
    }, [select, title, description]);

    const handleBtn = (select: boolean, title: string, description: string) =>
        !(
            title.length > 0 &&
            title.length <= 50 &&
            description.length >= 30 &&
            description.length <= 1000 &&
            select
        );

    const sendForm = async () => {
        let post;
        try {
            post = await postApi.add(title, description);
        } catch (err) {
            console.error(err);
            return;
        }
        router.push(`/post/${post.id}`);
    };

    return (
        <div className="flex flex-col gap-20 w-[100%]">
            <Input
                clearable
                type="text"
                underlined
                value={title}
                onChange={(e) => setTitleValue(e.target.value)}
                labelPlaceholder="Tytuł"
                helperText={`${title.length} / 30`}
                className="w-[30%] xl:w-[50%] md:w-[100%]"
            />
            <Textarea
                underlined
                color="primary"
                value={description}
                onChange={(e) => setDescriptionValue(e.target.value)}
                labelPlaceholder="Opis"
                helperText={`Wpisz przynajmniej 30 znaków. ${description.length} / 1000`}
                className="w-[100%]"
                minRows={15}
            />

            <div>
                <Checkbox
                    defaultSelected={select}
                    onChange={(e) => setSelectValue(e)}
                    css={{ fontSize: "10px" }}
                >
                    <span className="text-[13px]">Zapoznałem się i akceptuję regulamin.</span>
                </Checkbox>
                <Spacer />
                <Button
                    disabled={handleBtn(select, title, description)}
                    className={`${
                        handleBtn(select, title, description)
                            ? "bg-[#E5E5E5] text-[#ABABAB]"
                            : "bg-primaryPink"
                    } text-white hover:bg-secondaryPink hover:text-primaryPink active:bg-[#ffb8b8] active:text-white  focus:bg-primaryPink focus:text-white`}
                    onClick={sendForm}
                >
                    Dodaj ogłoszenie
                </Button>
            </div>
        </div>
    );
}
