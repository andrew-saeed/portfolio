import Alpine from 'alpinejs'
import gsap from 'gsap'
import { z } from 'zod'

// init NotificationModal component
function initNotificationModal() {
    Alpine.store('notificationModal', {
        isOpen: false,
        title: '',
        body: '',
        open({title, body}) {
            document.body.style.overflowY = 'hidden'
            
            this.isOpen = true
            this.title = title
            this.body = body
        },
        close() {
            document.body.style.overflowY = 'auto'
    
            this.isOpen = false
        }
    })
}

// init MainNav component
function initMainNav() {

    gsap.registerPlugin(ScrollTrigger)

    const mainNav = document.querySelector('#main-nav')

    //Section top-main gsap-timeline
    gsap.timeline({
        scrollTrigger: {
            trigger: '#top-main',
            start: 'top center',
            end: 'bottom center',
            onEnterBack:()=>{
                mainNav.style.opacity = '0'
                mainNav.style.transform = 'translateY(-100px)'
            }
        }
    })

    // Section me gsap-timeline
    const sectionMeTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#me',
            start: 'top center',
            end: 'bottom center',
            onEnter:()=>{
                mainNav.style.opacity = '1'
                mainNav.style.transform = 'translateY(0)'
                mainNav.querySelector('.currentBtn')?.classList.remove('currentBtn')
                mainNav.querySelector('li:nth-child(1)')?.classList.add('currentBtn')
                sectionMeTl.play()
            },
            onEnterBack:()=>{
                mainNav.querySelector('.currentBtn')?.classList.remove('currentBtn')
                mainNav.querySelector('li:nth-child(1)')?.classList.add('currentBtn')
            }
        }
    })
    sectionMeTl.fromTo('#i-will-create', {opacity: 0, x: 100}, {opacity: 1, x: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#web-developer', {opacity: 0, x: 100}, {opacity: 1, x: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#supercharge-vibe-coding-with-ai', {opacity: 0, x: 100}, {opacity: 1, x: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#passionate', {opacity: 0, x: 100}, {opacity: 1, x: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#download-resume', {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: 0.6, ease: 'expo'})
    .pause()

    // Section tech-skills gsap-timeline
    const sectionTechSkillsTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#tech-skills',
            start: 'top center',
            end: 'bottom center',
            onEnter:()=>{
                mainNav.querySelector('.currentBtn')?.classList.remove('currentBtn')
                mainNav.querySelector('li:nth-child(2)')?.classList.add('currentBtn')
                sectionTechSkillsTl.play()
            },
            onEnterBack:()=>{
                mainNav.querySelector('.currentBtn')?.classList.remove('currentBtn')
                mainNav.querySelector('li:nth-child(2)')?.classList.add('currentBtn')
            }
        }
    })
    sectionTechSkillsTl.fromTo('#astrobuild', {opacity: 0, y: -100, x: -200, rotateZ: -45}, {opacity: 1, y: 0, x: 0, rotateZ: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#tailwindcss', {opacity: 0, y: -100, x: 200, rotateZ: 45}, {opacity: 1, y: 0, x: 0, rotateZ: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#alpinejs', {opacity: 0, y: -100, x: -200, rotateZ: -45}, {opacity: 1, y: 0, x: 0, rotateZ: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#vuejs', {opacity: 0, y: -100, x: 200, rotateZ: 45}, {opacity: 1, y: 0, x: 0, rotateZ: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#django', {opacity: 0, y: -100, x: -200, rotateZ: -45}, {opacity: 1, y: 0, x: 0, rotateZ: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#chalimo', {opacity: 0, bottom: '100%', right: '-100%'}, {opacity: 1, bottom: '20%', right: '30%', duration: 0.6, ease: 'expo'})
    .fromTo('#orange-slice', {opacity: 0, top: '-100%', left: '-40%'}, {opacity: 1, top: '-12%', left: '-10%', duration: 0.6, ease: 'expo'})
    .pause()

    // Section work gsap-timeline
    const sectionWorkTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#work',
            start: 'top center',
            end: 'bottom center',
            onEnter:()=>{
                mainNav.querySelector('.currentBtn')?.classList.remove('currentBtn')
                mainNav.querySelector('li:nth-child(3)')?.classList.add('currentBtn')
                sectionWorkTl.play()
            },onEnterBack:()=>{
                mainNav.querySelector('.currentBtn')?.classList.remove('currentBtn')
                mainNav.querySelector('li:nth-child(3)')?.classList.add('currentBtn')
            }
        }
    })
    sectionWorkTl.fromTo('#work .sub-title', { x:-100 }, { x:0, duration:0.3, ease:'expo' })
    .fromTo('#work .sub-title', { opacity:0 }, { opacity:1, duration:0.9 }, 0)
    .fromTo('#work .samples-list', { opacity:0, x:300 }, { opacity:1, x:0, duration:0.9, ease:'expo' }, 0)
    .pause()

    //Section dm gsap-timeline
    gsap.timeline({
        scrollTrigger: {
            trigger: '#dm',
            start: 'top center',
            end: 'bottom center',
            onEnter:()=>{
                mainNav.querySelector('.currentBtn')?.classList.remove('currentBtn')
                mainNav.querySelector('li:nth-child(4)')?.classList.add('currentBtn')
            }
        }
    })

    mainNav.querySelectorAll('li').forEach( li => {

        li.addEventListener('click', () => {
            
            mainNav.querySelector('.currentBtn')?.classList.remove('currentBtn')
            li.classList.add('currentBtn')
        })
    })
}

// init DmForWork component
function initDmForWork() {

    const InputsSchema = z.object({
        subject: z.string().min(1, 'Subject is required'),
        email: z.string().min(1, 'Email is required').email('email is not valid'),
        message: z.string().nonempty("Message cannot be empty").min(9, 'Message is too short').max(255, 'Message max is 255')
    })
    
    Alpine.data('dmForWork', () => ({
        sending: false,
        errors: {
            subject: '',
            email: '',
            message: ''
        },
        validate(inputs) {
    
            this.errors = { subject: '', email: '', message: '' }
    
            return InputsSchema.safeParse(inputs)
        },
        async submit(e) {
    
            if(this.sending) return
    
            this.sending = true
    
            const form = e.target
            const subjectInput = form.elements.namedItem('subject')
            const emailInput = form.elements.namedItem('email')
            const messageInput = form.elements.namedItem('message')
    
            const inputs = {
                subject: subjectInput.value,
                email: emailInput.value,
                message: messageInput.value
            }
            
            const result = this.validate(inputs)
            if(!result.success) {
    
                result.error?.issues.forEach(error => {
    
                    const errorPath = error.path[0]
                    if (!this.errors[errorPath]) this.errors[errorPath] = error.message
                })
            } else {
    
                try {
                    
                    const res = await fetch('/dm-for-work/', {
                        method: 'POST',
                        body: JSON.stringify(result)
                    })

                    if(res.ok) {

                        (Alpine.store('notificationModal')).open({title: 'thank you', body: 'Email was sent.'})
                    } else {

                        (Alpine.store('notificationModal')).open({title: 'error', body: 'Sorry, an error has occurred.'})
                    }
                } catch {
    
                    (Alpine.store('notificationModal')).open({title: 'error', body: 'Sorry, an error has occurred.'})
                }
            }
    
            this.sending = false
        }
    }))
}

initNotificationModal()
initMainNav()
initDmForWork()

Alpine.start()