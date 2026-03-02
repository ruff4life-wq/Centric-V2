import { useUser } from '../context/UserContext';
import { User, Settings, LogOut } from 'lucide-react';

export default function Profile() {
  const { state, resetProgress } = useUser();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-serif text-sage-900">Your Profile</h1>

      <div className="bg-white p-6 rounded-2xl border border-sage-100 shadow-sm flex items-center gap-6">
        <div className="w-20 h-20 bg-sage-200 rounded-full flex items-center justify-center text-sage-600 text-2xl font-serif">
          {state.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-medium text-sage-900">{state.name}</h2>
          <p className="text-sage-500">Member since {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-serif text-sage-800">Assessment Summary</h3>
        <div className="bg-white p-6 rounded-2xl border border-sage-100 shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(state.assessment.wheelOfLife).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-3 bg-sage-50 rounded-lg">
                <span className="text-sm text-sage-700">{key}</span>
                <span className="font-bold text-sage-900">{value}/10</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-sage-200">
        <button 
          onClick={() => {
            if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
              resetProgress();
              window.location.href = '/';
            }
          }}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} /> Reset Progress
        </button>
      </div>
    </div>
  );
}
