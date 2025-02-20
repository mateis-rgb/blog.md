import Button from "@/app/components/Button";

const About = () => {
	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold text-center mb-6">À propos de notre blog</h1>
			
			<p className="text-lg text-gray-700 mb-4 text-justify">
				Bienvenue sur notre blog ! Nous sommes passionnés par le partage de connaissances et de
				discussions enrichissantes. Notre objectif est de fournir des contenus intéressants, pertinents
				et accessibles à tous les passionnés de développement, de technologie et bien plus encore.
			</p>
			
			<h2 className="text-2xl font-semibold text-gray-800 mb-2">Notre mission</h2>
			
			<p className="text-lg text-gray-700 mb-4 text-justify">
				Notre mission est de simplifier l'apprentissage de la programmation et des technologies tout en
				créant un espace convivial pour échanger des idées, partager des expériences et explorer de
				nouvelles tendances.
			</p>

			<h2 className="text-2xl font-semibold text-gray-800 mb-2">Qui sommes-nous ?</h2>

			<p className="text-lg text-gray-700 mb-4 text-justify">
				Nous sommes un groupe de développeurs, designers et créateurs de contenu avec un seul objectif :
				aider les autres à se développer professionnellement et personnellement à travers des articles,
				des tutoriels et des ressources utiles.
			</p>

			<Button className="mt-8" variant="primary" size="medium" type="link" href="/contact">Contactez-nous</Button>
		</div>
	);
}

export default About;