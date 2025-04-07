'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import { postAction } from '@/actions/diary'
import { Button } from '@/components/ui/button'
import SwitchButton from '../../atom/SwitchButton/SwitchButton'
import { useState } from 'react'
import toast, { Toaster } from "react-hot-toast"
import { GridPattern } from '@/components/magicui/grid-pattern'
import { cn } from '@/lib/utils'
import { Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PublicLabel from '@/components/molecules/PublicLabel/PublicLabel'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount,
      Placeholder.configure({
        placeholder: "Today was a day to remember...",
      })
    ],
    immediatelyRender: false,
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-xl focus:outline-none h-[400px] rounded-md overflow-y-scroll"
      }
    }
  })


  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = ("0" + (today.getMonth() + 1)).slice(-2);
  const dd = ("0" + today.getDate()).slice(-2);
  const todayStr = `${yyyy}-${mm}-${dd}`;
  const [isPubice, setIsPublic] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  return (
    <div className='mx-auto'>
      <Toaster />
      <div className='w-full'>
        <form action={async () => {
          if (editor?.storage.characterCount.characters() <= 0) {
            toast.dismiss()
            toast.error("0文字");
          } else {
            toast.loading("送信中")
            setIsLoading(true)
            await postAction(editor?.getHTML() as string, todayStr, isPubice)
            setIsLoading(false)
            toast.dismiss()
            toast.success("投稿完了")
            router.push("/")
            router.refresh()
          }
        }}>
          <div className='relative mb-[20px]'>
            <div className='max-w-[565px] mx-auto relative'>
              <EditorContent editor={editor} />
            </div>
            <GridPattern
              width={30}
              height={30}
              x={-1}
              y={-1}
              strokeDasharray={"4 2"}
              className={cn(
                "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
              )}
            />
          </div>
          <div className='max-w-[565px] mx-auto'>
            <div className='flex items-center'>
              <div className='flex-1 flex gap-3 items-center'>
                <SwitchButton isChecked={isPubice} handleToggle={() => setIsPublic(!isPubice)} />
                <PublicLabel isPublic={isPubice}/>
              </div>
              <Button className='cursor-pointer' type='submit' disabled={isLoading}>Save</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Tiptap
