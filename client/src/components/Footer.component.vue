<template>
    <footer class="footer">
        <ul class="footer__list">
            <li class="footer__item">
                <a href="https://www.Google.com" class="footer__link">About</a>
            </li>
            <li class="footer__item">
                <a href="https://www.Google.com" class="footer__link">Help</a>
            </li>
            <li class="footer__item">
                <a href="https://www.Google.com" class="footer__link">Posts</a>
            </li>
            <li class="footer__item">
                <a href="https://www.Google.com" class="footer__link">Guidelines</a>
            </li>
            <li class="footer__item">
                <a href="https://www.Google.com" class="footer__link">Blog</a>
            </li>
            <li class="footer__item">
                <a href="https://www.Google.com" class="footer__link">Help forum</a>
            </li>
            <li class="footer__item">
                <a href="https://www.Google.com" class="footer__link">Developers</a>
            </li>
            <li class="footer__item">
                <a href="https://www.Google.com" class="footer__link">Jobs</a>
            </li>
            <li class="footer__item">
                <a href="https://www.Google.com" class="footer__link">Contact</a>
            </li>
        </ul>

        <ul class="footer__list">
            <li>
                <a class="footer__link footer__link--icon" href="https://github.com/albert-anthony6" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
            </li>
            <li>
                <a class="footer__link footer__link--icon" href="https://www.linkedin.com/in/avaldes21/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
            </li>
        </ul>
    </footer>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .footer{
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: black;
        width: 100vw;
        padding: 1.2rem 0 1.2rem 0;
        display: flex;
        justify-content: space-between;
        
        &__list{
            padding: 0 2rem 0 2rem;
            display: flex;
            list-style: none;
            align-items: center;
        }
        
        &__item{
            &:not(:first-child){
                margin-left: 10rem;
            }
            font-size: 1.5rem;
        }
        
        &__link{
            text-decoration: none;
            color: rgba(194, 194, 194, 1);
            transition: all .2s;

            &:hover{
                color: #fff;
            }

            &--icon{
                font-size: 2.2rem;
                margin: 0 2.5rem 0 2rem;
            }
        }
    }
</style>