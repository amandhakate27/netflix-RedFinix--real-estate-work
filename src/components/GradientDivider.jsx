const GradientDivider = () => {
    return (
        <div className="relative w-full overflow-x-hidden" style={{ height: '6.25rem', zIndex: 1 }}>

            {/* CurvedDiv */}
            <div
                style={{
                    position: 'absolute',
                    height: '100%',
                    top: 0,
                    margin: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    borderTop: 'solid .25rem #f01843',
                    borderLeft: 'solid .25rem transparent',
                    borderRight: 'solid .25rem transparent',
                    borderBottom: 'none',
                    borderTopLeftRadius: '50% 100%',
                    borderTopRightRadius: '50% 100%',
                    background: `radial-gradient(
                        50% 500% at 50% -420%,
                        rgba(64, 97, 231, 0.4) 80%,
                        rgba(0, 0, 0, 0.1) 100%
                    ), black`,
                    backgroundClip: 'padding-box',
                    width: '180%',
                    left: '-40%',
                }}
            />
        </div>
    );
};

export default GradientDivider;