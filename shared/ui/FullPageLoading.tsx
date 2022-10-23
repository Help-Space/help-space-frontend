import {Loading} from "@nextui-org/react";

export default function FullPageLoading() {
    return (
        <div className="flex flex-col gap-4 items-center min-h-screen py-[100px] md:min-h-[auto] ">
            <Loading />
            <span className="text-lightDark text-[40px] font-[700]">Loading</span>
        </div>);
}