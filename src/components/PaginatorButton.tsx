interface PaginatorButtonProps {
    text: string;
    onClick: () => any;
}

const PaginatorButton: React.FC<PaginatorButtonProps> = ({ text, onClick }) => {
    return (
        <div className="flex items-center space-x-2">
            <button className='text-sm font-medium text-muted-foreground hover:text-amber-500 transition-colors border border-neutral-400 hover:border-amber-500 rounded-md px-3 py-2 hover:cursor-pointer' onClick={onClick}>
                {text}
            </button>
        </div>
    )
}

export default PaginatorButton;