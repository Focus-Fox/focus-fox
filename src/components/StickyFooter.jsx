import './StickyFooter.css'
// come up with better name than sticky
// relies on .app-container and .content-wrap in App.css

function StickyFooter() {
    return (
        <>
            <footer className='sticky-footer' id="footer">
                {/* Change this */}
                <p>made with love. and immense care.</p>
            </footer>
        </>
    )
}

export default StickyFooter