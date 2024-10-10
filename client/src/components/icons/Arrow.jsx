function Arrow({ mirror }) {
    return (
        <svg
            style={{
                transform: mirror ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fillRule="evenodd"
            clipRule="evenodd"
            fill="white"
        >
            <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
        </svg>
    );
}

export default Arrow;