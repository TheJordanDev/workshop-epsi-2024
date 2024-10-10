function NavigationButtons({ backCallback, nextCallback, answer, questionIndex }) {
    return (
        <div className="navigation">
            { questionIndex > 0 && 
                <button className="navigation-button previous"
                    onClick={backCallback}
                >Précédent</button> 
            }
            <button className="navigation-button next"
                disabled={answer === null}
                onClick={nextCallback}
            >Suivant</button>
        </div>
    );
}

export default NavigationButtons;