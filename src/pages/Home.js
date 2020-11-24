import { Component } from 'react';
import { BannerImage, CTAOne } from '../layout';
import banner from '../images/Patrick.jpg';
import code from '../images/Code.jpg';
import leadership from '../images/Patrick_Leadership.jpg';
import sound from '../images/Patrick_Sound.jpg';

class Home extends Component {
    render() {
        let caption = "Howdy! My name is Patrick, and I'm here to help you! If you have any questions about software development, live music production, or leadership development, then you've come to the right place! Connect with me through any of my social media accounts or send me an email. I can't wait to connect with you!";
        let ctas = [{
                title: "Software Engineering",
                image: code,
                caption: "Access to over 10 years of experience developing software using current best practices and agile methodologies."
            }, {
                title: "Leadership",
                image: leadership,
                caption: "Discover your potential through leadership development, and become who you were meant to be."
            }, {
                title: "Live Music Production",
                image: sound,
                caption: "Audio not up to par for your live event? Need help with lighting, lyrics, and live streaming? We can help!"
            }];
        return (
            <div>
                <BannerImage caption={caption} image={banner} />
                <hr />
                <CTAOne ctas={ctas} />
            </div>
        );
    }
}

export default Home;
