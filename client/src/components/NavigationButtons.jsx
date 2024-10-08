function NavigationButtons({ nextCallback, answer, questionIndex }) {
    return (
        <div className="navigation">
            { questionIndex > 0 && <button className="navigation-button">Previous</button> }
            <button className="navigation-button"
                disabled={answer === null}
                onClick={nextCallback}
            >Next</button>
        </div>
    );
}

export default NavigationButtons;