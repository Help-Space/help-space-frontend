import { Post } from "post/types";
import { Card, Image, Text } from "@nextui-org/react";

export default function PostCard({ title, author: { id, firstName, lastName }, content }: Post) {
    return (
        <Card>
            <Card.Header css={{ display: "flex", justifyContent: "space-between" }}>
                <Text>{title}</Text>
                <Image src="/favorite_icon.svg" alt="Polub post" />
            </Card.Header>
            <Card.Body>
                <Text>{content}</Text>
            </Card.Body>
        </Card>
    );
}
