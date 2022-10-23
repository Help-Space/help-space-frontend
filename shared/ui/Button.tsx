export default function CustomButton({content} : {content: string} ) {
    return (
        <button
            className="py-2 rounded-[10px] transition ease-in-out delay-50 bg-primaryPink text-white hover:bg-secondaryPink hover:text-primaryPink active:bg-[#ffb8b8] active:text-white focus:bg-primaryPink focus:text-white"
            >
            {content}
        </button>
    );
}