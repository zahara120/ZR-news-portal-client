export default function Button (props) {
    return (
        <button
            className={`${props.className} bg-black text-white py-2 px-4 rounded`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}