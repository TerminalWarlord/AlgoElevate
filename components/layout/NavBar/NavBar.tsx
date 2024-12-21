

const NavBar = () => {
    return (
        <div className="w-full bg-black h-16 flex justify-between items-center px-[100px]">
            <div>
                <h1 className="text-white text-2xl font-odibee-sans" style={{ fontFamily: 'var(--font-odibee-sans)' }}>AlgoElevate</h1>
            </div>
            <div className="space-x-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                <button className="text-white bg-[#FF2F51] rounded-3xl px-3 py-2">Login</button>
                <button className="text-white border-bg-[#F2F2F2] border-2 rounded-3xl px-3 py-2">Register</button>
            </div>
        </div>
    );
}

export default NavBar;
