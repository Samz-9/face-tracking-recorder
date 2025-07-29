'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as faceapi from 'face-api.js'
import { Camera, Video, Square, Play, Pause, Download } from 'lucide-react'

export default function Home() {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const [recording, setRecording] = useState(false)
    const [videoChunks, setVideoChunks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [faceCount, setFaceCount] = useState(0)
    const [recordingTime, setRecordingTime] = useState(0)
    const [savedVideoUrl, setSavedVideoUrl] = useState(null)

    useEffect(() => {
        const loadModels = async () => {
            try {
                const MODEL_URL = '/models'
                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
                setIsLoading(false)
            } catch (err) {
                console.error('Model loading error:', err)
                setIsLoading(false)
            }
        }
        loadModels()
        startVideo()
    }, [])

    useEffect(() => {
        let interval
        if (recording) {
            interval = setInterval(() => {
                setRecordingTime(prev => prev + 1)
            }, 1000)
        } else {
            setRecordingTime(0)
        }
        return () => clearInterval(interval)
    }, [recording])

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user'
            }
        })
            .then((stream) => {
                videoRef.current.srcObject = stream
                videoRef.current.play()
            })
            .catch((err) => console.error('Camera Error:', err))
    }

    const detectFace = async () => {
        if (!videoRef.current || isLoading) return

        try {
            const detections = await faceapi.detectAllFaces(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions()
            )

            setFaceCount(detections.length)

            const canvas = canvasRef.current
            const dims = faceapi.matchDimensions(canvas, videoRef.current, true)
            const resized = faceapi.resizeResults(detections, dims)
            const ctx = canvas.getContext('2d')
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            resized.forEach(detection => {
                const { x, y, width, height } = detection.box

                ctx.shadowColor = '#00ff88'
                ctx.shadowBlur = 20
                ctx.strokeStyle = '#00ff88'
                ctx.lineWidth = 3
                ctx.strokeRect(x, y, width, height)

                ctx.shadowBlur = 0
                ctx.strokeStyle = '#ffffff'
                ctx.lineWidth = 1
                ctx.strokeRect(x + 2, y + 2, width - 4, height - 4)
            })
        } catch (err) {
            console.error('Detection error:', err)
        }
    }

    useEffect(() => {
        let interval
        if (videoRef.current && !isLoading) {
            setTimeout(() => {
                interval = setInterval(detectFace, 100)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isLoading])

    const startRecording = () => {
        const stream = videoRef.current.srcObject
        const canvasStream = canvasRef.current.captureStream(30)
        const combinedStream = new MediaStream([
            ...stream.getVideoTracks(),
            ...canvasStream.getVideoTracks()
        ])
        const recorder = new MediaRecorder(combinedStream, {
            mimeType: 'video/webm;codecs=vp9'
        })
        mediaRecorderRef.current = recorder
        setVideoChunks([])

        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) setVideoChunks((prev) => [...prev, e.data])
        }

        recorder.onstop = () => {
            const blob = new Blob(videoChunks, { type: 'video/webm' })
            const url = URL.createObjectURL(blob)
            
            // Save the video URL in state for later download
            setSavedVideoUrl(url)
            console.log('Video saved for download.')
            
            // Auto-download immediately
            // const a = document.createElement('a')
            // a.href = url
            // a.download = `face-detection-${Date.now()}.webm`
            // a.click()
        }

        recorder.start()
        setRecording(true)
    }

    const stopRecording = () => {
        mediaRecorderRef.current.stop()
        setRecording(false)
    }

    const handleDownload = () => {
        if (savedVideoUrl) {
            const a = document.createElement('a')
            a.href = savedVideoUrl
            a.download = `face-detection-${Date.now()}.webm`
            a.click()
        } else {
            alert("No saved video found. Please record a video first.")
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        AI Face Detection
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Real-time face detection with advanced AI technology. Record your sessions with beautiful visual overlays.
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="flex gap-6 mb-8 flex-wrap justify-center">
                    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl px-6 py-3 flex items-center gap-3">
                        <Camera className="w-5 h-5 text-cyan-400" />
                        <span className="text-sm font-medium">Faces: {faceCount}</span>
                    </div>
                    {recording && (
                        <div className="bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-2xl px-6 py-3 flex items-center gap-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
                        </div>
                    )}
                    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl px-6 py-3 flex items-center gap-3">
                        <Video className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-medium">
                            {isLoading ? 'Loading...' : 'Ready'}
                        </span>
                    </div>
                    {savedVideoUrl && (
                        <div className="bg-blue-500/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl px-6 py-3 flex items-center gap-3">
                            <Download className="w-5 h-5 text-blue-400" />
                            <span className="text-sm font-medium">Video Saved</span>
                        </div>
                    )}
                </div>

                {/* Main Video Container */}
                <div className="relative w-full max-w-4xl mb-8">
                    <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl">
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                style={{ transform: 'scaleX(-1)' }}
                            />
                            <canvas
                                ref={canvasRef}
                                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                                style={{ transform: 'scaleX(-1)' }}
                            />

                            {/* Loading Overlay */}
                            {isLoading && (
                                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                        <p className="text-cyan-400 font-medium">Loading AI Models...</p>
                                    </div>
                                </div>
                            )}

                            {/* Recording Indicator */}
                            {recording && (
                                <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-white">REC</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Control Buttons */}
                <div className="flex gap-4 flex-wrap justify-center">
                    {!recording ? (
                        <button
                            onClick={startRecording}
                            disabled={isLoading}
                            className="group relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:shadow-lg flex items-center gap-3"
                        >
                            <Play className="w-5 h-5" />
                            Start Recording
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </button>
                    ) : (
                        <button
                            onClick={stopRecording}
                            className="group relative bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center gap-3"
                        >
                            <Square className="w-5 h-5" />
                            Stop Recording
                            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </button>
                    )}
                    
                    {savedVideoUrl && (
                        <button
                            onClick={handleDownload}
                            className="group relative bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center gap-3"
                        >
                            <Download className="w-5 h-5" />
                            Download Video
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </button>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="text-slate-400 text-sm">
                        Powered by Face-API.js • Real-time AI Processing
                    </p>
                </div>
            </div>
        </div>
    )
}