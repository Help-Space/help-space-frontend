export default function FullPageError({content}: { content: string }) {
    return (
        <div className="flex flex-col gap-4 items-center min-h-screen py-[100px] md:min-h-[auto] ">
            <span className="text-lightDark text-[40px] font-[700] text-center">{content}</span>
        </div>);
}