import React, { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import classes from "./HomePage.module.scss";

import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

function HomePage2(props) {
	const [firstState, setFirstState] = useState("nutin");



	return (
		<>
			<div>This is the home page</div>

			<Card
				style={{
					width: 300,
					height: "min-content",
				}}
				cover={
					<img
						alt="example"
						src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
					/>
				}
			>
				<Meta
					avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
					title="Card title"
					description="This is the description"
				/>
			</Card>

			<Card
				style={{
					width: 300,
				}}
				cover={
					<img
						alt="example"
						src="https://www.entrio.hr/images/events/campaigns/10415_campaign_761x341_2717.png?v=1645176041"
					/>
				}
			>
				<Meta
					avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
					title="Card title"
					description="This is the description"
				/>
			</Card>

			<div className={classes.cardCointainer}>
				<Card className={classes.card}>
					<div className={classes.imageContainer}>
						<img
							alt="example"
							src="https://www.entrio.hr/images/events/campaigns/10415_campaign_761x341_2717.png?v=1645176041"
						/>
					</div>

					<div className={classes.cardContent}>
						<h3>Naslov NaslovNaslovNaslovNaslovNaslov</h3>
						<p>Opis dasdasdjkaskldjaskldljasdlkasjdjklaslkdjaksl</p>
					</div>
				</Card>
				<Card className={classes.card}>
					<div className={classes.imageContainer}>
						<img
							alt="example"
							src="https://www.entrio.hr/images/events/campaigns/10415_campaign_761x341_2717.png?v=1645176041"
						/>
					</div>

					<div className={classes.cardContent}>
						<h3>Naslov NaslovNaslovNaslovNaslovNaslov</h3>
						<p>Opis dasdasdjkaskldjaskldljasdlkasjdjklaslkdjaksl</p>
					</div>
				</Card>
				<Card className={classes.card}>
					<div className={classes.imageContainer}>
						<img
							alt="example"
							src="https://www.entrio.hr/images/events/campaigns/10415_campaign_761x341_2717.png?v=1645176041"
						/>
					</div>

					<div className={classes.cardContent}>
						<h3>Naslov NaslovNaslovNaslovNaslovNaslov</h3>
						<p>Opis dasdasdjkaskldjaskldljasdlkasjdjklaslkdjaksl</p>
					</div>
				</Card>

				<Card className={classes.card}>
					<div className={classes.imageContainer}>
						<img
							alt="example"
							src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
						/>
					</div>

					<div className={classes.cardContent}>
						<h3>Naslov NaslovNaslovNaslovNaslovNaslov</h3>
						<p>Opis dasdasdjkaskldjaskldljasdlkasjdjklaslkdjaksl</p>
					</div>
				</Card>
			</div>
		</>
	);
}

export default HomePage2;
