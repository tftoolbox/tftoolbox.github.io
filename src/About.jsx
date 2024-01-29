import React from "react";

function About() {
	return (
		<div className="home">
			<div 
				style={{
					maxWidth: "100vw",
					minHeight: "100vh",
					position: "relative",
					overflow: "hidden"
				}}
			>
				<div 
					style={{ 
					marginLeft: "calc(max(40px, 100vw - 1280px))",
					marginRight: "calc(max(40px, 100vw - 1280px))"
					}}
				>
					<div className="first-section">
						<div
							style={{
							minHeight: "25vh",
							maxWidth: "100%",
							display: "flex",
							textAlign: "start",
							flexDirection: "column"
							}}
						>
							<div style={{ zIndex: 1 }}>
								<h1>
									About Us
								</h1>
								<hr class="solid"/>
								<p
									style={{
										marginTop: "50px",
										marginBottom: "0px"
									}}
								>
									TFToolbox is a passion project by Michael Kim and Alex Bai to create tools for TeamFight Tactics that help players improve decision-making during games. <br/><br/>Currently, we are working on implementing puzzles using a TFT simulator,
									allowing players to practice positioning of champions to win in different matchups. This project is currently in alpha and new features are being implemented every day.  
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  );
}

export default About;
