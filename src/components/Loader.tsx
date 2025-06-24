interface LoaderProps {
    isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
    if (!isLoading) return null

    return (
        <div data-testid="loader" className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
                <img className="w-[20%]" src="pikachuloader.webp" alt="Cargando..." />
                <p className="text-sm text-muted-foreground font-medium">Procesando...</p>
            </div>
        </div>
    )
}

export default Loader;
