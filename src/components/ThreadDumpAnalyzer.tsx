
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import { Activity, AlertTriangle, Search, Download, Filter, Cpu, Clock, Zap } from "lucide-react";

const ThreadDumpAnalyzer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const threadStates = [
    { name: 'RUNNABLE', value: 45, color: '#10B981' },
    { name: 'BLOCKED', value: 23, color: '#EF4444' },
    { name: 'WAITING', value: 67, color: '#F59E0B' },
    { name: 'TIMED_WAITING', value: 34, color: '#3B82F6' },
    { name: 'TERMINATED', value: 12, color: '#6B7280' },
  ];

  const cpuIntensiveThreads = [
    { thread: 'TaskExecutor-1', cpuUsage: 89, state: 'RUNNABLE', priority: 'HIGH' },
    { thread: 'HttpProcessor-2', cpuUsage: 76, state: 'RUNNABLE', priority: 'MEDIUM' },
    { thread: 'DatabasePool-3', cpuUsage: 67, state: 'BLOCKED', priority: 'HIGH' },
    { thread: 'AsyncHandler-4', cpuUsage: 54, state: 'WAITING', priority: 'LOW' },
    { thread: 'ScheduledTask-5', cpuUsage: 45, state: 'TIMED_WAITING', priority: 'MEDIUM' },
  ];

  const deadlockData = [
    {
      thread1: 'DatabaseConnection-Pool-1',
      thread2: 'TransactionManager-2',
      resource: 'connection_pool_lock',
      duration: '2.3s',
      severity: 'critical'
    },
    {
      thread1: 'MessageProcessor-A',
      thread2: 'EventHandler-B',
      resource: 'queue_mutex',
      duration: '1.8s',
      severity: 'high'
    }
  ];

  const threadTrends = [
    { time: '10:00', total: 156, blocked: 12, waiting: 45 },
    { time: '10:05', total: 163, blocked: 18, waiting: 52 },
    { time: '10:10', total: 171, blocked: 25, waiting: 48 },
    { time: '10:15', total: 168, blocked: 23, waiting: 51 },
    { time: '10:20', total: 174, blocked: 31, waiting: 47 },
    { time: '10:25', total: 181, blocked: 28, waiting: 54 },
  ];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-slate-800/30 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-400" />
            Thread Dump Analysis Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search threads by name or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Thread State Distribution */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Cpu className="h-5 w-5 mr-2 text-green-400" />
              Thread State Distribution
            </CardTitle>
            <CardDescription className="text-slate-400">
              Current thread states across the JVM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={threadStates}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {threadStates.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151', 
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {threadStates.map((state, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: state.color }}
                    ></div>
                    <span className="text-sm text-slate-300">{state.name}</span>
                  </div>
                  <span className="text-sm text-white font-medium">{state.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CPU Intensive Threads */}
        <Card className="xl:col-span-2 bg-slate-800/30 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-400" />
              High CPU Usage Threads
            </CardTitle>
            <CardDescription className="text-slate-400">
              Threads consuming the most CPU resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cpuIntensiveThreads.map((thread, index) => (
                <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-white">{thread.thread}</span>
                      <Badge 
                        variant={thread.state === 'RUNNABLE' ? 'default' : 
                                thread.state === 'BLOCKED' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {thread.state}
                      </Badge>
                      <Badge 
                        variant={thread.priority === 'HIGH' ? 'destructive' : 
                                thread.priority === 'MEDIUM' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {thread.priority}
                      </Badge>
                    </div>
                    <span className="text-white font-bold">{thread.cpuUsage}%</span>
                  </div>
                  <Progress value={thread.cpuUsage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Deadlock Detection */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
              Deadlock Detection
            </CardTitle>
            <CardDescription className="text-slate-400">
              Identified deadlocks and circular dependencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deadlockData.map((deadlock, index) => (
                <div key={index} className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="destructive" className="text-xs">
                      {deadlock.severity.toUpperCase()}
                    </Badge>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{deadlock.duration}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="text-slate-300">
                      <strong>Thread 1:</strong> {deadlock.thread1}
                    </div>
                    <div className="text-slate-300">
                      <strong>Thread 2:</strong> {deadlock.thread2}
                    </div>
                    <div className="text-slate-300">
                      <strong>Resource:</strong> {deadlock.resource}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Thread Trends */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-400" />
              Thread Count Trends
            </CardTitle>
            <CardDescription className="text-slate-400">
              Thread count evolution over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={threadTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151', 
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="blocked" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="waiting" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { ThreadDumpAnalyzer };
