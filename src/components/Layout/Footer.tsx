const Footer = () => {
    return (
        <footer>
        <div className="bg-slate-100 p-3 mt-2">
          <div className="container mx-auto">
            FastRent © {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    )
}

export default Footer;