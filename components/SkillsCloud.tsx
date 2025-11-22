
import React from 'react';
import { ExtractedSkill } from '../types';
import { Copy, Tag, Check, BarChart2 } from 'lucide-react';

interface SkillsCloudProps {
  skills: ExtractedSkill[];
}

const SkillsCloud: React.FC<SkillsCloudProps> = ({ skills }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    const text = skills.map(s => s.skill.name).join(', ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (skills.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-[#1b4d3e]/10 p-2.5 rounded-xl">
            <Tag className="w-6 h-6 text-[#1b4d3e]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-poppins">Extracted Taxonomy</h3>
            <p className="text-sm text-slate-500 font-medium font-inter">Powered by Lightcast Open Skills</p>
          </div>
        </div>
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 bg-slate-50 hover:bg-[#1b4d3e]/10 hover:text-[#1b4d3e] rounded-full transition-all border border-slate-200 font-inter"
          title="Copy list"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy All'}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((item) => {
          // Confidence styling
          const confidencePct = Math.round(item.confidence * 100);
          const isHighConfidence = item.confidence > 0.8;

          return (
            <div 
              key={item.skill.id}
              className={`
                group flex items-center gap-2 pl-4 pr-3 py-2 rounded-xl text-base font-semibold
                border transition-all duration-200 cursor-default
                ${isHighConfidence 
                  ? 'bg-slate-50 border-slate-200 text-slate-800 hover:border-[#1b4d3e]/40' 
                  : 'bg-slate-50/50 border-slate-100 text-slate-600 hover:border-slate-300'}
              `}
            >
              <span className="font-inter">{item.skill.name}</span>
              
              {/* Confidence Indicator */}
              <div 
                className={`
                  flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold font-mono
                  ${isHighConfidence ? 'bg-emerald-100 text-[#1b4d3e]' : 'bg-slate-200 text-slate-500'}
                `}
                title={`Match Confidence: ${confidencePct}%`}
              >
                {confidencePct}%
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
         <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-poppins">Skill Confidence</span>
         </div>
         <span className="bg-[#1b4d3e] text-white text-xs font-bold px-3 py-1 rounded-lg font-mono">{skills.length} Detected</span>
      </div>
    </div>
  );
};

export default SkillsCloud;
