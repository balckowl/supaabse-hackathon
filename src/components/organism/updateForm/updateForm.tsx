'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import { updateAction } from '@/actions/diary'
import { Button } from '@/components/ui/button'
import SwitchButton from '../../atom/SwitchButton/SwitchButton'
import { useState } from 'react'
import toast, { Toaster } from "react-hot-toast"
import { GridPattern } from '@/components/magicui/grid-pattern'
import { cn } from '@/lib/utils'
import { Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  content: string
  diaryId: string
  isPublic: boolean;
  finishUpdate: () => void;
}

export default function UpdateForm({ content, diaryId, isPublic: currentIspublic, finishUpdate }: Props) {

  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount,
      Placeholder.configure({
        placeholder: "Today was a day to remember...",
      })
    ],
    immediatelyRender: false,
    content: content,
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
  const [isPubice, setIsPublic] = useState(currentIspublic)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  return (
    <div className='mx-auto'>
      <Toaster />
      <div className='w-full'>
        <form action={async () => {
          if (editor?.storage.characterCount.characters() <= 0) {
            toast.dismiss()
            toast.error("Nothing is written.");
          } else {
            toast.loading("Posting...")
            setIsLoading(true)
            await updateAction(editor?.getHTML() as string, Number(diaryId), isPubice)
            setIsLoading(false)
            toast.dismiss()
            toast.success("Posted successfully")
            finishUpdate()
            router.push(`/diaries/${diaryId}`)
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
                {!isPubice && <p className='flex items-center gap-3 font-semibold text-red-500'><Lock color='red' />日記交換ができません。</p>}
              </div>
              <Button className='cursor-pointer' type='submit' disabled={isLoading}>Update</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
