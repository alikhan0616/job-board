export default function Hero(){
    return(
        <>
        <section className="py-12">
            <h1 className="text-4xl text-center font-bold">Find your next <br /> dream job</h1>
            {/* <p className="text-center text-slate-600">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora amet asperiores consectetur quaerat beatae error velit doloribus cum obcaecati veritatis dolor rerum sequi, doloremque recusandae esse est excepturi, sapiente cumque.
            </p> */}
            <form className="flex gap-2 max-w-md mx-auto mt-4 px-2">
                <input
                type="search"
                className="border border-gray-400 rounded-lg w-full py-2 px-3"
                placeholder="Search phrase..." />
                <button className="py-2 px-4 bg-blue-600 text-white rounded-md">Search</button>
            </form>
        </section>
        </>
    )
}