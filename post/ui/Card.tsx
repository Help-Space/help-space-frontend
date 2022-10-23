import { Post } from "post/types";
import {
    Button,
    Card,
    Spacer,
    Tooltip,
    Dropdown,
    Popover,
    Row,
    Text,
    Modal,
    Input,
    Checkbox,
} from "@nextui-org/react";
import HeartIcon from "./HeartIcon";
import { postApi } from "post/api";
import { useMemo, useState } from "react";
import { useUser } from "user/store/useUser";
import { useRouter } from "next/router";
import UserAvatar from "user/ui/Avatar";
import LikeButton from "./LikeButton";
import Link from "next/link";

function EditPost() {
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };
    return (
        <div>
            <span onClick={handler}>Open modal</span>
            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Welcome to
                        <Text b size={18}>
                            NextUI
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                    />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Password"
                    />
                    <Row justify="space-between">
                        <Checkbox>
                            <Text size={14}>Remember me</Text>
                        </Checkbox>
                        <Text size={14}>Forgot password?</Text>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Close
                    </Button>
                    <Button
                        auto
                        onClick={closeHandler}
                        className="bg-primaryPink text-white hover:bg-secondaryPink hover:text-primaryPink active:bg-[#ffb8b8] active:text-white  focus:bg-primaryPink focus:text-white"
                    >
                        Sign in
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

function DropdownMenu({ id }: { id: string }) {
    return (
        <Dropdown>
            <Dropdown.Button
                color="error"
                flat
                icon={<img src="/dropdown_icon.svg" alt="icon" />}
            ></Dropdown.Button>
            <Dropdown.Menu>
                <Dropdown.Item key="refresh">
                    {/* <div onClick={() => postApi.refresh(id)}> */}
                    Odśwież ogłoszenie
                    {/* </div> */}
                </Dropdown.Item>
                <Dropdown.Item key="close">
                    {/* <div onClick={() => postApi.update()> */}
                    Zakończ ogłoszenie
                    {/* </div> */}
                </Dropdown.Item>
                <Dropdown.Item key="edit">
                    <EditPost />
                    {/* <div> */}
                    {/* Edytuj ogłoszenie */}
                    {/* </div> */}
                </Dropdown.Item>
                <Dropdown.Item key="delete" withDivider color="error">
                    {/* <div onClick={() => postApi.remove(id)}> */}
                    Usuń ogłoszenie
                    {/* </div> */}
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function ButtonConv() {
    return (
        <>
            <Spacer y={1} />
            <div className="px-[1.5rem] pb-[1rem] sm:px-[1rem] sm:pb-[0.5rem]">
                <Button
                    css={{ fontSize: "$lg" }}
                    className="md:w-full bg-primaryPink text-white hover:bg-secondaryPink hover:text-primaryPink active:bg-[#ffb8b8] active:text-white focus:bg-primaryPink focus:text-white"
                >
                    Napisz
                </Button>
            </div>
        </>
    );
}

export default function PostCard({
    id: postId,
    title,
    author: { id: authorId, firstName, lastName },
    content,
    liked,
    lastRefresh,
}: Post) {
    const router = useRouter();

    const { id: userId, isLoggedIn } = useUser();

    const [showMore, setShowMore] = useState(false);
    const contentWords = useMemo(() => content.split(" "), [content]);

    return (
        <Card css={{ border: "none", width: "100%", paddingBlock: "1rem" }}>
            <div
                className="flex items-center w-full"
                style={{
                    justifyContent: "space-between",
                    paddingInline: "1.5rem",
                    paddingBottom: "1rem",
                }}
            >
                <span
                    className="font-[700] text-[20px] cursor-pointer md:text-[18px]"
                    style={{ display: "flex", flexWrap: "wrap", wordBreak: "break-word" }}
                    onClick={() => router.push(`/post/${postId}`)}
                >
                    {title}
                </span>
                {authorId !== userId ? (
                    <div>
                        <LikeButton postId={postId} liked={liked} />
                    </div>
                ) : (
                    <DropdownMenu id={postId} />
                )}
            </div>
            <div>
                <div className="flex font-quicksand" style={{ paddingInline: "1.5rem" }}>
                    <Link href={`/profile/${authorId}`}>
                        <a>
                            <UserAvatar firstName={firstName} lastName={lastName} />
                        </a>
                    </Link>
                    <Spacer x={0.5} />
                    <div className="flex flex-col">
                        <Link href={`/profile/${authorId}`}>
                            <a className="">{firstName + " " + lastName}</a>
                        </Link>
                        <span style={{ fontSize: "12px" }}>
                            {new Date(lastRefresh).toLocaleString()}
                        </span>
                    </div>
                </div>
                <Spacer y={1} />
                <span
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        paddingInline: "1.5rem",
                        wordBreak: "break-word",
                    }}
                >
                    {showMore ? content : contentWords.slice(0, 100).join(" ")}
                </span>
                <Spacer y={1} />
                {contentWords.length > 100 && !showMore && (
                    <span
                        className="text-mediumDark font-bold underline-offset-1 px-[1.5rem] "
                        onClick={() => setShowMore(true)}
                    >
                        Pokaż więcej...
                    </span>
                )}
                {authorId !== userId && isLoggedIn && <ButtonConv />}
            </div>
        </Card>
    );
}
