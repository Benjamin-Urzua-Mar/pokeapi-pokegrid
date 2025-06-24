import PageButton from "./PageButton";
import PaginatorButton from "./PaginatorButton";

interface PaginatorProps {
    total: number;
    currentPage: number;
    onPageChange: (newPage: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ total, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(total / 30);

    const getPageNumbers = (selectedPage: number, total: number): number[] => {
        if (total <= 3) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }
        if (selectedPage === 1) {
            return [1, 2, 3];
        }
        if (selectedPage === total) {
            return [total - 2, total - 1, total];
        }
        return [selectedPage - 1, selectedPage, selectedPage + 1];
    };

    const visiblePages = getPageNumbers(currentPage, totalPages);

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handleClickPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        if (page === currentPage) return;
        onPageChange(page);
    };

    return (
        <section className="flex flex-col items-center space-y-4 mb-8">
            <div className="flex items-center space-x-2">
                <PaginatorButton text="Anterior" onClick={handlePrev} />
                <div className="flex space-x-1">
                    {visiblePages.length === 0 ? (
                        <span className="px-3 py-2 text-sm text-muted-foreground">
                            ...
                        </span>
                    ) : (
                        visiblePages.map((page) => (
                            <PageButton
                                key={page}
                                pageNumber={page}
                                onClick={() => handleClickPage(page)}
                                selected={page === currentPage}
                            />
                        ))
                    )}
                </div>
                <PaginatorButton text="Siguiente" onClick={handleNext} />
            </div>

            <p className="text-sm text-muted-foreground">
                {(() => {
                    const pageSize = 30;
                    const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
                    let end = currentPage * pageSize;
                    if (end > total) end = total;
                    return `Mostrando ${start}-${end} de ${total} pokémons`;
                })()}
            </p>
        </section>
    );
};

export default Paginator;