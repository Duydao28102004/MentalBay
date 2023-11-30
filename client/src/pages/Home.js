import Header from '../components/Header'
import MoodTracker from '../components/MoodTracker';
const Home = () => {
    return (
        <div className="home">
        <h2>
            <Header></Header>
            <MoodTracker></MoodTracker>
        </h2>
    </div>
    )
}

export default Home