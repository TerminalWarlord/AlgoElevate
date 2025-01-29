import Card from "../ui/Card/Card"

const Home = () => {
    return (
        <div>
            <div className="flex items-center flex-col pt-16">
                <h1 className="text-[96px] leading-none py-0 my-0" style={{ fontFamily: 'var(--font-bebas-neue)' }}>SOME <span className="text-[#FF0000] leading-none py-0 my-0">RANDOM</span> shit HERE!!!</h1>
                <h2 className="text-4xl leading-none" style={{ fontFamily: 'var(--font-baumans)' }}>and some more random shit, but in small fonts</h2>
            </div>
            <div>
                <Card />
            </div>
        </div>
    )
}

export default Home
