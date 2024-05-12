import { PageDesign } from '@prisma/client';

type designProperties = {
	backgroundColor: string; // can be a linear gradient
	textColor: string;
	buttonColor: string;
	buttonTextColor: string;
};

type Designs = Record<PageDesign, designProperties>;

const designs: Designs = {
	BLACKWHITE: {
		backgroundColor: '#000000',
		textColor: '#FAFAFA',
		buttonColor: '#FAFAFA',
		buttonTextColor: '#000000'
	},
	WHITEBLACK: {
		backgroundColor: '#FAFAFA',
		textColor: '#000000',
		buttonColor: '#000000',
		buttonTextColor: '#FAFAFA'
	},
	COLORFUL: {
		backgroundColor:
			'linear-gradient(9deg, rgba(0,36,34,0.9051995798319328) 0%, rgba(9,81,121,0.8855917366946778) 37%, rgba(255,0,202,0.8267682072829132) 100%)',
		textColor: '#FAFAFA',
		buttonColor: '#FAFAFA',
		buttonTextColor: '#000000'
	}
};

export default function getDesign(design: PageDesign) {
	return designs[design];
}
