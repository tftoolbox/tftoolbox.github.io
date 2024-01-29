import React from "react";
import './ContactUs.css';

function ContactUs() {
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
									Contact Us
								</h1>
								<hr class="solid"/>
								<p
									style={{
										marginTop: "50px",
										marginBottom: "0px"
									}}
								>
									If you have any questions about our project, please feel free to email us!
								</p>
							</div>
						</div>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							marginTop: "50px",
						}}
						>
						<a
							href="mailto:tftoolboxbeta@gmail.com"
							className="button"
							style={{ marginRight: "50px" }}
						>
							OUR EMAIL
						</a>
					</div>
				</div>
			</div>
		</div>
  );
}

export default ContactUs;
