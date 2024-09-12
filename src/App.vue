<template>
	<hgroup>
		<h1>Con mucho amor te he preparado esto</h1>
		<h2>Espero que te guste</h2>
	</hgroup>
	<div class="letter-container">
		<button @click="openCard()">
			<div class="cover" :class="{ open: open }"></div>
			<p class="paper" :class="{ openCard: open }">
				<span class="text-blur">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
					ipsam pariatur laborum quis,
					delectus eos omnis vitae minima dicta veritatis dolore incidunt impedit quod soluta consectetur
					fugit sequi
					fuga aliquam?
				</span>
			</p>
			<div class="letter"></div>
		</button>
		<div class="btns-container" :class="{ 'btns-container-open': open }">
			<button class="btn open-image" @click="openModal()">Abrir</button>
			<a href="../public/Cartita.pdf" download="Carta" class="btn download" type="pdf">Descargar</a>
		</div>
	</div>


	<dialog ref="modal" @abort="closeModal()">
		<article class="card">
			<div ref="front" class="face front">
				<img @mousedown="startDrag" @touchstart="startDrag" draggable="false" src="./assets/zoro_good_tits.jpg"
					alt="buenas tetas">
			</div>
			<div ref="back" class="face back">
				<img @mousedown="startDrag" @touchstart="startDrag" draggable="false"
					src="./assets/zoro_i_have_best.jpg" alt="pero yo las tengo mejores">
			</div>
		</article>
	</dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);
const modal = ref<HTMLDialogElement>();
const front = ref<HTMLElement>();
const back = ref<HTMLElement>();
const isAnimating = ref(false);

function openCard() {
	open.value = !open.value;
}

function openModal() {
	modal.value?.showModal();
}

function closeModal() {
	modal.value?.close();
}

function startDrag(e: MouseEvent | TouchEvent) {
	if (isAnimating.value) return;

	const element = e.target as HTMLElement;

	const frontDeg = ref(0)
	const backDeg = ref(180)

	element?.addEventListener("mousemove", onMove, { passive: true })
	element?.addEventListener("touchmove", onMove, { passive: true })
	element?.addEventListener("mouseup", onEnd, { passive: true })
	element?.addEventListener("touchend", onEnd, { passive: true })

	function onMove() {
		// const currentX = (e as MouseEvent).pageX ?? (e as TouchEvent).touches[0].pageX;

		frontDeg.value += 180
		backDeg.value -= 180

		// pullDeltaX.value = currentX - startX

		// if (pullDeltaX.value === 0) return;

		front.value!.style.transform = `perspective(600px) rotateY(${frontDeg.value}deg)`;
		back.value!.style.transform = `perspective(600px) rotateY(${backDeg.value}deg)`;
	}

	function onEnd() {
		element!.removeEventListener("mousemove", onMove)
		element!.removeEventListener("touchmove", onMove)
		element!.removeEventListener("mouseup", onEnd)
		element!.removeEventListener("touchend", onEnd)

		element!.addEventListener("transitionend", () => {
			element.remove();
		})
	}
}

</script>

<style scoped lang="css">
hgroup {
	padding-bottom: 7.5em;
}

.letter-container {

	button {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		transition: 0.25s ease-in-out;
		position: relative;

		&:hover,
		&:focus-within {
			transform: scale(110%);
		}
	}

	.letter {
		position: relative;
		border-inline: 200px solid #ff989e;
		border-top: 100px solid transparent;
		border-bottom: 100px solid #ff858a;
		border-radius: 8px;
		z-index: 2;
	}

	.cover {
		position: absolute;
		top: 0;
		left: 0;
		border-inline: 200px solid transparent;
		border-top: 100px solid #fe3334;
		border-bottom: 100px solid transparent;
		border-radius: 8px;
		transition: 0.2s ease-in-out;
	}

	.paper {
		position: absolute;
		z-index: -1;
		max-height: 200px;
		max-width: 400px;
		background: #ffc5d2;
		padding: 1em;
		font-size: 1rem;
		transition: .2s ease-in-out;
		overflow: hidden;
		margin: 0;
		font-size: 1.25rem;
		border-radius: 8px;

		.text-blur {
			filter: blur(5px) invert(1);
		}
	}

	.openCard {
		transform: translateY(-50px);
		z-index: 0;
	}

	.open {
		transform: rotateX(180deg);
		transform-origin: top;
	}

}

.btns-container {
	margin-top: 2.5em;
	display: flex;
	opacity: 0;
	width: 100%;
	align-items: center;
	justify-content: space-evenly;
	transition: .2s ease-in-out;

	.btn {
		border-radius: 8px;
		background: none;
		padding: .5em 1.25em;
		border: 1px solid #ff858a;
		color: black;
		font-weight: 700;
		font-size: 1.25rem;
		cursor: pointer;
		user-select: none;
	}
}

.btns-container-open {
	opacity: 1;
}

dialog {
	border: none;
	outline: none;
	background: none;
	overflow: hidden;

	.card {
		position: relative;
		width: 400px;
		height: 350px;

		.face {
			position: absolute;
			width: 100%;
			height: 100%;
			backface-visibility: hidden;
			border-radius: 10px;
			overflow: hidden;
			transition: .25s;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				user-select: none;
			}
		}

		.front {
			transform: perspective(600px) rotateY(0deg);
		}

		.back {
			transform: perspective(600px) rotateY(180deg);
		}

		/* &:hover {
			.front {
				transform: perspective(600px) rotateY(-180deg);
			}

			.back {
				transform: perspective(600px) rotateY(0deg);
			}
		} */
	}

	&::backdrop {
		backdrop-filter: blur(10px);
	}
}
</style>
