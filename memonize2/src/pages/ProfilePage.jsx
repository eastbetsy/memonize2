import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setProfile(doc.data());
      } else {
        console.log("No such profile document!");
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching profile:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <div className="text-center p-10 text-gray-500">Loading Profile...</div>;
  }

  if (!user || !profile) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Profile</h2>
        <p className="text-gray-500">Please sign in to view your profile.</p>
      </div>
    );
  }

  const xpProgress = profile.current_xp && profile.xp_to_next_level
    ? (profile.current_xp / profile.xp_to_next_level) * 100
    : 0;

  const stats = [
    { label: 'Total XP', value: profile.experience || 0, icon: '⭐' },
    { label: 'Study Streak', value: `${profile.study_streak || 0} days`, icon: '🔥' },
    { label: 'Notes Created', value: profile.total_notes || 0, icon: '📝' },
    { label: 'Flashcards', value: profile.total_flashcards || 0, icon: '🃏' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-8 text-center shadow-md">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-lg">
          🧑‍🚀
        </div>
        <h1 className="text-3xl font-bold text-gray-800">{profile.username}</h1>
        <p className="text-gray-500">Cosmic Learner • Level {profile.level}</p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Level Progress</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{profile.current_xp} XP</span>
            <span>{profile.xp_to_next_level} XP to Level {profile.level + 1}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-400 to-purple-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
