import { postApi } from "post/api";
import PostsWithPagination from "post/layout/WithPagination";
import { Container, Card } from "@nextui-org/react";

export default function FavouritesPage() {
    return (
        <>
            <div className="max-w-[1320px] mx-auto">
                <Container className="pt-5">
                    <Card className="flex justify-center align-center items-center " css={{ border: "none", paddingBlock: "1rem" }}>
                        <span className="font-[700] text-[32px] md:text-[28px] sm:text-[23px] text-mediumDark ">Polubione ogłoszenia</span>
                    </Card>
                </Container>
            </div>
            <PostsWithPagination getPosts={postApi.getLiked} />
        </> 
    )
}
