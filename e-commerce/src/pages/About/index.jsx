import React, { useState, useEffect } from 'react';
import Loading from '../../components/loading/index';

function About() {
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        },); // Simulate 2 seconds of loading
    }, []);

    return (
        <div>
            {isLoading ? (
                // Display the Loading component while loading
                <Loading />
            ) : (
                // Display your actual content when loading is done
                <div>
                    <h1>hello</h1>
                </div>
            )}
        </div>);
}

export default About;