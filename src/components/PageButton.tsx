interface PageButtonProps {
    pageNumber: number;
    onClick: () => any;
    selected?: boolean;
}

const PageButton: React.FC<PageButtonProps> = ({ pageNumber, onClick, selected }) => {
    return (
        <button
            className={`text-sm font-medium transition-colors border rounded-md px-3 py-2 hover:cursor-pointer
                ${selected
                    ? "bg-amber-400 text-white border-amber-400"
                    : "text-muted-foreground hover:text-amber-500 border-neutral-400 hover:border-amber-500"
                }`}
            onClick={onClick}
        >
            {pageNumber}
        </button>
    )
}

export default PageButton;