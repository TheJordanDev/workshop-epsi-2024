function NavigationButtons({ backCallback, nextCallback, answer, questionIndex }) {
    return (
        <div className="navigation">
            { questionIndex > 0 && 
                <button className="navigation-button previous"
                    onClick={backCallback}
                >Previous</button> 
            }
            <button className="navigation-button next"
                disabled={answer === null}
                onClick={nextCallback}
            >Next</button>
        </div>
    );
}

export default NavigationButtons;