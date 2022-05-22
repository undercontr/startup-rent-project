import Head from "next/head"
import Footer from "./Footer"
import Header from "./Header"

const Layout = (props) => {
    return (
        <>
            <Head>
                
            </Head>
            <div>
                <Header logo={""} />
                {props.children}
                <Footer />
            </div>
        </>
    )
}

export default Layout