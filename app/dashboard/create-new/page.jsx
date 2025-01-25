
"use client"
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import PlayerDialog from '../_components/PlayerDialog';

const CreateNew = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const [playVideo,setPlayVideo]=useState(true);
  const [videoId, setVideoid]=useState(3);
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const {user}=useUser();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const onCreateClickHandler = async () => {
    setLoading(true) //gpt
    await GetVideoScript(); 
    // You can call the other functions here after GetVideoScript completes.
    // GenerateAudioFile(videoScript);
    // GenerateAudioCaption(audioFileUrl, videoScript);
    // GenerateImage(videoScript);
    setLoading(false) //gpt
  };

  // Get Video Script
  const GetVideoScript = async () => {
    setLoading(true);
    const prompt = 'Write a script to generate ' + formData.duration + ' video on topic : ' + formData.topic + ' along with AI image prompt in ' + formData.imageStyle + ' format for each scene and give me result in JSON format with imagePrompt and ContentText as field.';
    console.log(prompt)
    const result = await axios.post('/api/get-video-script', { 
      prompt 
    });
    if (result.data.result) {
      setVideoData(prev => ({
        ...prev,
        'videoScript': result.data.result
      }));
      setVideoScript(result.data.result);
      GenerateAudioFile(result.data.result);
    }
  };

  // Generate Audio File
  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = '';
    const id = uuidv4();
    videoScriptData.forEach(item => {
      script = script + item.ContentText + ' ';
    });
    const resp = await axios.post('/api/generate-audio', { text: script, id: id });
    setVideoData(prev => ({
      ...prev,
      'audioFileUrl': resp.data.result
    }));
    setAudioFileUrl(resp.data.result);
    resp.data.result && await GenerateAudioCaption(resp.data.result, videoScriptData);
  };

  // Generate Audio Caption
  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);
    const resp = await axios.post('/api/generate-caption', { audioFileUrl: fileUrl });
    setCaptions(resp?.data?.result);
    setVideoData(prev => ({
      ...prev,
      'captions': resp.data.result
    }));
    resp.data.result && await GenerateImage(videoScriptData);
  };
  
  

  // Generate Image
  const GenerateImage = async (videoScriptData) => {
    let images = [];
    for (const element of videoScriptData) {
      try {
        const resp = await axios.post('/api/generate-image', { prompt: element.imagePrompt });
        images.push(resp.data.result);
      } catch (e) {
        console.log('Error:' + e);
      }
    }
    setVideoData(prev => ({
      ...prev,
      'imageList': images
    }))
    setImageList(images);
    setLoading(false);
  }
  

  useEffect(() => {
    console.log(videoData);
    if(Object.keys(videoData).length==4)
    {
      SaveVideoData(videoData);
    }
  }, [videoData]);


  const SaveVideoData=async(videoData)=>{
      setLoading(true)

      const result=await db.insert(VideoData).values({
        script:videoData?.videoScript,
        audioFileUrl:videoData?.audioFileUrl,
        captions:videoData?.captions,
        imageList:videoData?.imageList,
        createdBy:user?.primaryEmailAddress?.emailAddress
      }).returning({id:VideoData?.id})

      setVideoid(result[0].id)
      setPlayVideo(true)
      console.log(result);
      setLoading(false);
  }

  

  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>
      <div className='mt-10 shadow-md p-10'>
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </div>
  );
};

export default CreateNew;

