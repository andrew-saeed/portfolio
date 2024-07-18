import Alpine from 'alpinejs'
import gsap from 'gsap'
import { z } from 'zod'

// NotificationModal component
function notificationModal() {
    Alpine.store('notificationModal', {
        isOpen: false,
        title: '',
        body: '',
        open({title, body}:{title: string, body: string}):void {
            document.body.style.overflowY = 'hidden'
            
            this.isOpen = true
            this.title = title
            this.body = body
        },
        close():void {
            document.body.style.overflowY = 'auto'
    
            this.isOpen = false
        }
    } as NotificationModal)
}

// MainNav component
function mainNav() {
    // Section me gsap-timeline
    const sectionMeTl = gsap.timeline()
    sectionMeTl.fromTo('#aspiring-web-developer', {opacity: 0, x: 100}, {opacity: 1, x: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#passionate', {opacity: 0, x: 100}, {opacity: 1, x: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#eager-to-leverage-skills', {opacity: 0, x: 100}, {opacity: 1, x: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#download-resume', {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: 0.6, ease: 'expo'})
    .pause()

    // Section web-stack gsap-timeline
    const sectionWebStackTl = gsap.timeline()
    sectionWebStackTl.fromTo('#astrobuild', {opacity: 0, y: -100, x: -200, rotateZ: -45}, {opacity: 1, y: 0, x: 0, rotateZ: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#tailwindcss', {opacity: 0, y: -100, x: 200, rotateZ: 45}, {opacity: 1, y: 0, x: 0, rotateZ: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#alpinejs', {opacity: 0, y: -100, x: -200, rotateZ: -45}, {opacity: 1, y: 0, x: 0, rotateZ: 0, duration: 0.6, ease: 'expo'})
    .fromTo('#chalimo', {opacity: 0, bottom: '100%', right: '-100%'}, {opacity: 1, bottom: '-20%', right: '40%', duration: 0.6, ease: 'expo'})
    .fromTo('#orange-slice', {opacity: 0, top: '-100%', left: '-40%'}, {opacity: 1, top: '-20%', left: '-5%', duration: 0.6, ease: 'expo'})
    .pause()

    Alpine.data('MainNav', () => ({
        init() {
    
            this.$el.querySelectorAll('li').forEach( li => {
    
                li.addEventListener('click', () => {
                    
                    this.$el.querySelector('.currentBtn')?.classList.remove('currentBtn')
                    li.classList.add('currentBtn')
                })
            })
    
            const observer = new IntersectionObserver(entries => {
                
                entries.forEach(entry => {
                    
                    if (entry.isIntersecting) {
                        
                        if(entry.target.id === 'top-main') {
    
                            this.$el.style.opacity = '0'
                            this.$el.style.transform = 'translateY(-100px)'
                        } else if(entry.target.id === 'me') {
    
                            this.$el.style.opacity = '1'
                            this.$el.style.transform = 'translateY(0)'
                            this.$el.querySelector('.currentBtn')?.classList.remove('currentBtn')
                            this.$el.querySelector('li:nth-child(1)')?.classList.add('currentBtn')
                            sectionMeTl.play()
                        } else if(entry.target.id === 'web-stack') {
    
                            this.$el.querySelector('.currentBtn')?.classList.remove('currentBtn')
                            this.$el.querySelector('li:nth-child(2)')?.classList.add('currentBtn')
                            sectionWebStackTl.play()
                        } else if(entry.target.id === 'work') {
    
                            this.$el.querySelector('.currentBtn')?.classList.remove('currentBtn')
                            this.$el.querySelector('li:nth-child(3)')?.classList.add('currentBtn')
                        } else if(entry.target.id === 'dm') {
    
                            this.$el.querySelector('.currentBtn')?.classList.remove('currentBtn')
                            this.$el.querySelector('li:nth-child(4)')?.classList.add('currentBtn')
                        }
                    }
                })
            }, {threshold: 0.9})
    
            const sections:HTMLElement[] = Array.from(document.querySelectorAll<HTMLElement>('section'))
            sections.forEach( section => observer.observe(section))
        }
    }))
}

// DmForWork component
function dmForWork() {

    const InputsSchema = z.object({
        subject: z.string().min(1, 'subject is required'),
        email: z.string().min(1, 'email is required').email('email is not valid'),
        message: z.string().min(9, 'message is too short').max(255, 'message max is 255')
    })
    
    type InputsSchemaType = z.infer<typeof InputsSchema>
    
    Alpine.data('dmForWork', () => ({
        sending: false,
        errors: {
            subject: '',
            email: '',
            message: ''
        },
        validate(inputs:InputsSchemaType) {
    
            this.errors = { subject: '', email: '', message: '' }
    
            return InputsSchema.safeParse(inputs)
        },
        async submit(e: SubmitEvent) {
    
            if(this.sending) return
    
            this.sending = true
    
            const form = e.target as HTMLFormElement
            const subjectInput = form.elements.namedItem('subject') as HTMLInputElement
            const emailInput = form.elements.namedItem('email') as HTMLInputElement
            const messageInput = form.elements.namedItem('message') as HTMLInputElement
    
            const inputs = {
                subject: subjectInput.value,
                email: emailInput.value,
                message: messageInput.value
            }
            
            const result = this.validate(inputs)
            if(!result.success) {
    
                result.error?.issues.forEach(error => {
    
                    const errorPath = error.path[0] as keyof typeof this.errors
                    if (!this.errors[errorPath]) this.errors[errorPath] = error.message
                })
            } else {
    
                try {
                    
                    await fetch(`${import.meta.env.PUBLIC_SITE_URL}/dm-for-work/`, {
                        method: 'POST',
                        body: JSON.stringify(result)
                    });
                    
                    (Alpine.store('notificationModal') as NotificationModal).open({title: 'thank you', body: 'Email was sent.'});
                } catch {
    
                    (Alpine.store('notificationModal') as NotificationModal).open({title: 'error', body: 'Sorry, an error has occurred.'});
                }
            }
    
            this.sending = false
        }
    }))
}

notificationModal()
mainNav()
dmForWork()

Alpine.start()