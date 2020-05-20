<template>
    <div class="hero">
        <div class="hero__text">
            <h1>Find your passion.</h1>
            <p>Join the dearlife community and share your passion with others all around the globe.</p>
            <button>Start for free</button>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Footer from '../components/Footer.component';

    export default {
        name: 'Home',
        components: {
            Footer
        }
    }
</script>

<style lang="scss" scoped>
    .hero{
        background-image: linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) ), url('../assets/images/bear.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        height: 100vh;

        &__text{
            text-align: center;
            width: 55rem;
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            
            h1{
            font-size: 6rem;
            line-height: 2;
            }

            p{
            font-size: 2rem;
            font-weight: 500;
            }

            button{
            color: #000;
            cursor: pointer;
            margin-top: 3rem;
            border: none;
            outline: none;
            border-radius: 5px;
            font-weight: 700;
            font-size: 2.5rem;
            padding: 2rem 3rem 2rem 3rem;
            transition: all .2s;
            
            &:hover{color: rgba(0, 0, 0, .5)}
            }
        }
    }
</style>