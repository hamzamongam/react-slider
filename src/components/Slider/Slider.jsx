import React, { useCallback, useEffect, useRef, useState } from 'react';

const Slider = ({ children, arrow = true, dots = true, autoPlay = false }) => {

    const initDrag = {
        diffX: 0,
        diffY: 0,
        dragging: false,
        styles: {},
        dir: ''
    }

    const [dragSetup, setDragSetup] = useState(initDrag)
    const sliders = useRef()
    const [currectSlider, setSlider] = useState(1)
    const [childrenLength, setChildrenLength] = useState()
    const [initialized, setInitialized] = useState(false)

    // Arrow Control start
    const handleNext = useCallback(() => {
        if (currectSlider <= childrenLength) {
            setSlider(prev => prev + 1)
            sliders.current.style.transitionDuration = '.5s'
            sliders.current.style.transform = `translate(-${100 * (currectSlider + 1)}%)`
            if (currectSlider === childrenLength) {
                setTimeout(() => {
                    setSlider(1)
                    sliders.current.style.transitionDuration = '0s'
                    sliders.current.style.transform = `translate(-100%)`
                }, 500);
            }
        }
    }, [currectSlider, childrenLength])

    const handlePrev = () => {
        if (currectSlider >= 1) {
            setSlider(prev => prev - 1)
            sliders.current.style.transitionDuration = '.5s'
            sliders.current.style.transform = `translate(-${100 * (currectSlider - 1)}%)`

            if (currectSlider === 1) {
                setTimeout(() => {
                    setSlider(childrenLength)
                    sliders.current.style.transitionDuration = '0s'
                    sliders.current.style.transform = `translate(-${100 * childrenLength}%)`
                }, 500);
            }
        }
    }

    // Arrow Control end

    // Bullet Control Start
    const gotoSlide = (val) => {
        setSlider(val)
        sliders.current.style.transitionDuration = '.5s'
        sliders.current.style.transform = `translate(-${100 * val}%)`

    }

    // Bullet Control End

    // Touch Control start
    const dragStart = (e) => {
        var touchobj = e.changedTouches[0]
        setDragSetup({
            diffX: touchobj.pageX,
            diffY: touchobj.pageY,
            dragging: true
        })
    }
    const draging = (e) => {
        var touchobj = e.changedTouches[0];
        const newdiffX = touchobj.pageX - dragSetup.diffX
        const newdiffY = touchobj.pageY - dragSetup.diffY
        if (dragSetup.dragging) {
            setDragSetup({
                diffX: newdiffX,
                diffY: newdiffY,
            })
            if (Math.abs(newdiffX) > Math.abs(newdiffY)) {
                if (newdiffX < 0) {
                    handleNext()
                } else {
                    handlePrev()
                }
            }
        }
    }
    const dragEnd = (e) => {
        setDragSetup({
            dragging: false
        })
    }

    // Touch Control End

    // Slider Initial Configration 
    useEffect(() => {
        setInitialized(true)
        const firstSlider = sliders.current.children[0].cloneNode(true)
        const lastSlider = sliders.current.children[sliders.current.children.length - 1].cloneNode(true)
        sliders.current.insertBefore(lastSlider, sliders.current.children[0])
        sliders.current.append(firstSlider)
        sliders.current.style.transitionDuration = '0s'
        sliders.current.style.transform = `translate(-100%)`
        setChildrenLength(sliders.current.children.length - 2)

    }, [])

    useEffect(() => {
        let time
        if (initialized && autoPlay) {
            time = setInterval(() => {
                handleNext()
            }, 3000);
            return () => clearInterval(time);
        }

    }, [handleNext, initialized, autoPlay]);
    return (
        <div className="slider-container">

            {arrow && (
                <div className="slider-arrow">
                    <button className="slider-btn btn-right" onClick={handleNext}></button>
                    <button className="slider-btn btn-left" onClick={handlePrev}></button>
                </div>
            )}

            <div onTouchEnd={dragEnd} onTouchStart={dragStart} onTouchMove={draging} ref={sliders} className="slider-list" >
                {children}
            </div>
            {
                dots && (
                    <div className="bullet-controls">
                        {
                            [...Array(childrenLength)].map((_, key) => (
                                <span key={key} className={currectSlider === (key + 1) ? 'active' : ''} onClick={() => { gotoSlide(key + 1) }} > </span>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Slider;