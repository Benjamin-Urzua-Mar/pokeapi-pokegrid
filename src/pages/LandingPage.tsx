import Hero from "../components/Hero";

const LandingPage = () => {
    return (
        <main>
            <Hero />
            <section className="text-center">
                <h2 className="text-lg sm:text-2xl font-bold mb-4">¡Para comenzar presiona START!</h2>
                <button className="bg-amber-400 text-white font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-amber-500 transition-colors hover:cursor-pointer" type="button" onClick={() => location.href = '/pokegrid'}>
                    START
                </button>
            </section>
            <section className="text-center mt-3">
                <img className="sm:w-[40%] mt-20 sm:mt-2 2xl:mt-20 mx-auto" src="charizardbailando.gif" alt="" />
            </section>
        </main>
    );
};

export default LandingPage;
